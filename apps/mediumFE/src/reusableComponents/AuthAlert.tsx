// Import components with types (assuming they exist)
import { AlertTitle, AlertDescription, Alert } from "@/components/ui/alert";

// Interface for AlertOctagonIcon props
interface AlertOctagonIconProps {
  className?: string;
}

export default function AuthAlert({ type }: any) {
  return (
    <>
      <Alert className="max-w-sm mx-auto" variant="destructive">
        <AlertOctagonIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{type}</AlertDescription>
      </Alert>
    </>
  );
}

function AlertOctagonIcon(props: AlertOctagonIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}
