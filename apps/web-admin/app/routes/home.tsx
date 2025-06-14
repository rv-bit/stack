import type { Route } from "./+types/home";

import { useQuery } from "@tanstack/react-query";

import { auth } from "~/lib/auth/auth.server";
import { useTRPC } from "~/lib/trpc/react";

import db from "@repo/db";
import * as schema from "@repo/db/schema";

export function meta({}: Route.MetaArgs) {
	return [{ title: "New React Router App" }, { name: "description", content: "Welcome to React Router!" }];
}

export async function loader({ request }: Route.LoaderArgs) {
	const session = await auth.api.getSession(request);
	const dbSelect = await db.select().from(schema.user);
	console.log("Loader called for home route", session, dbSelect);

	return new Response(`Welcome to React Router! Request URL: ${request.url}`);
}

export default function Home() {
	const trpc = useTRPC();
	const { data: hello } = useQuery(trpc.greeting.hello.queryOptions());

	return (
		<section className="flex items-center justify-center">
			<h1 className="text-center text-4xl font-bold">Welcome to App</h1>
		</section>
	);
}
