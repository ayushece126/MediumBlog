
import {Link} from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { useMemo } from "react";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
export default function AppBar() {
    const avatar = useMemo(() => {
      return createAvatar(lorelei, {
        size: 128,
        // ... other options
      }).toDataUriSync();
    }, []);
    return (
      
    <div className="flex w-full items-center justify-center px-4 md:px-6">
      <div className="h-14 flex items-center shrink-0">
        <Link className="flex items-center font-bold" to="/">
          Acme Inc
        </Link>
      </div>
      <div className="flex-1 justify-center ml-6">
        <div className="flex w-full max-w-md items-center rounded-lg bg-gray-100 border border-gray-200 px-4 dark:bg-gray-800 dark:border-gray-800">
          <SearchIcon className="h-5 w-5 mr-2.5 opacity-25" />
          <Input
            className="w-full border-0 box-shadow-none bg-transparent appearance-none min-w-0"
            placeholder="Search"
            type="search"
          />
        </div>
      </div>
      <div className="hidden md:flex w-full max-w-2xl ml-auto shrink-0 items-center justify-end">

        <div className="ml-4 flex items-center space-x-2">
          <Button size="sm" variant="outline">
            <FileEditIcon className="h-4 w-4" />
            Write
          </Button>
          <div>
            <div className="rounded-full overflow-hidden flex items-center focus:outline-none">
              <Avatar className="w-9 h-9 border-2 border-white">
                <AvatarImage alt="@shadcn" src={avatar} />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FileEditIcon(props: {className: string}) {
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
      <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
    </svg>
  );
}

function SearchIcon(props:{className: string}) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
