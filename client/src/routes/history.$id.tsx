import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/history/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  return <div>Hello {`/history/${id}`}</div>;
}
