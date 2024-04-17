/**
 * v0 by Vercel.
 * @see https://v0.dev/t/BQfTjKjcogK
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

interface BlogCardProp {
    id: string;
  authorName: string;
  publishedDate: string;
  Title: string;
  Description: string;
}
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useMemo } from "react";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { Link } from "react-router-dom";

export default function BlogCard({
  id,
  authorName,
  publishedDate,
  Title,
  Description,
}: BlogCardProp) {
  const avatar = useMemo(() => {
    return createAvatar(lorelei, {
      size: 128,
      seed: authorName,
      // ... other options
    }).toDataUriSync();
  }, []);
    
   
    return (
      <Link to={`/blog/${id}`}>
        <Card className="w-2/3 mx-auto">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage alt={authorName} src={avatar} />
                <AvatarFallback>{authorName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">
                  {authorName ? `${authorName}` : ""}
                </span>
                <span className="text-xs text-gray-500">
                  {publishedDate}
                  <Badge variant="secondary">Member-only</Badge>
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <h2 className="text-xl font-bold mt-4 mb-2">{Title}</h2>
            <p className="text-gray-700">
              {Description.length > 100
                ? `${Description.slice(0, 100)}.....`
                : Description}
            </p>
            <div className="flex items-center justify-between mt-4">
              <Badge>Side Hustle</Badge>
              <span className="text-sm text-gray-500">
                {Description.length / 100
                  ? `${Description.length / 100} mins read`
                  : "1 min read"}
              </span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center mt-4">
            <Button className="text-gray-500" variant="ghost">
              <BookmarkIcon className="w-5 h-5" />
            </Button>
            <Button className="text-gray-500" variant="ghost">
              <ShareIcon className="w-5 h-5" />
            </Button>
            <Button className="text-gray-500" variant="ghost">
              <MoreHorizontalIcon className="w-5 h-5" />
            </Button>
          </CardFooter>
        </Card>
      </Link>
    );
}

function BookmarkIcon(props: { className: string }) {
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
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}

function MoreHorizontalIcon(props: { className: string }) {
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
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}

function ShareIcon(props: { className: string }) {
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
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}
