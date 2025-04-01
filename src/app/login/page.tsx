import { LogInForm } from "@/components/LogInForm";
export const dynamic = "force-dynamic"; // Ensures SSR
export default async function LoginInPage() {

    return <>
    <LogInForm/>
    </>
}