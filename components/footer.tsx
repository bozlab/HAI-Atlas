import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Icons } from "./icons";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <Icons.twitter className="h-6 w-6 fill-current" />
          <Icons.gitHub className="h-6 w-6 fill-current" />
          <Facebook></Facebook>
          <Youtube></Youtube>
          <Linkedin></Linkedin>
          <Icons.twitter className="h-6 w-6 fill-current" />
          <Instagram></Instagram>
          <Youtube></Youtube>
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteConfig.name}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteConfig.name}</Link>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link href="https://github.com/timlrx/tailwind-nextjs-starter-blog">
            Tailwind Nextjs Theme
          </Link>
        </div>
      </div>
    </footer>
  );
}
