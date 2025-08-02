// app/forgotpassword/page.tsx

import { Suspense } from "react";
import ResetPasswordPage from "./ResetPasswordPage";

export const dynamic = "force-dynamic"; // Optional: disables prerendering if needed

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
