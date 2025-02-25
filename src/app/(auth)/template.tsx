'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const navLinks = [
  { name: "Register", href: '/register' },
  { name: "Login", href: '/login' },
  { name: "Forgot Password", href: '/forgot-password' },
]

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const [input ,setInput]=useState('')
  
  return <>
    <div className="p-10">
      <div>
         <input value={input} onChange={(e)=>setInput(e.target.value)}/>
      </div>
      {navLinks.map((links, index) => {
        const isActive = links.href === pathName || (pathName.startsWith(links.href) && links.href !== '/')
        return <React.Fragment key={index}>
          <Link className={`p-2 cursor-pointer ${isActive ? 'text-green-500 font-bold' : ''}`} href={links.href}>{links.name}
          </Link>
        </React.Fragment>
      })}
    </div >
    <div className="p-10 text-green-500 font-bold">
      {children}
    </div>
  </>

}
