jest.mock("./data/index", () => ({
  getPresentInvoiceData: jest.fn(),
  getInvoiceData: jest.fn(),
  getSpecificData: jest.fn(),
  createInvoiceData: jest.fn(),
  updateData: jest.fn(),
  deleteData: jest.fn(),
}));

import * as data from "./data/index";
import app from "./app";

const mocked = data as jest.Mocked<typeof data>;

// Build a fake RATE_LIMITER binding whose `limit()` result we control per test.
function envWith(success: boolean) {
  const limit = jest.fn(async () => ({ success }));
  return { env: { RATE_LIMITER: { limit } }, limit };
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe("rate limiter middleware", () => {
  it("returns 429 and does not reach the route when the limit is exceeded", async () => {
    const { env, limit } = envWith(false);

    const res = await app.request(
      "/api/getInvoice",
      { headers: { "cf-connecting-ip": "203.0.113.5" } },
      env,
    );

    expect(res.status).toBe(429);
    await expect(res.json()).resolves.toEqual({ error: "Too many requests" });
    // keyed on the caller's IP, and the route was never invoked
    expect(limit as jest.Mock).toHaveBeenCalledWith({ key: "203.0.113.5" });
    expect(mocked.getInvoiceData).not.toHaveBeenCalled();
  });

  it("falls back to an 'unknown' key when no cf-connecting-ip header is present", async () => {
    const { env, limit } = envWith(false);

    await app.request("/api/getInvoice", {}, env);

    expect(limit as jest.Mock).toHaveBeenCalledWith({ key: "unknown" });
  });

  it("lets the request through to the route when under the limit", async () => {
    const { env } = envWith(true);
    mocked.getInvoiceData.mockResolvedValue([] as never);

    const res = await app.request("/api/getInvoice", {}, env);

    expect(res.status).toBe(200);
    expect(mocked.getInvoiceData).toHaveBeenCalledTimes(1);
  });
});
