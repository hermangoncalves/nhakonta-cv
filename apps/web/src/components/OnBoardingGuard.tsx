import { routes } from "@/router";
import { SignedIn, useUser } from "@clerk/clerk-react";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export default function OnBoardingGuard({ children }: PropsWithChildren) {
  const { user, isLoaded } = useUser();
  const onboardingCompleted =
    user?.publicMetadata?.onboardingCompleted === true;

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!onboardingCompleted) {
    return <Navigate to={routes.onBoarding} />;
  }

  return <SignedIn>{children}</SignedIn>;
}
