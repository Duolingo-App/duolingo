"use client"

import React from 'react'
import { SidebarNav } from "@/app/components/sidebar-nav"
import { RightSidebar } from "@/app/components/right-sidebar"
import Home from "@/app/components/mainPage";

function Page() {
  return (
    <div>
       <div className="flex min-h-screen bg-[#ffffff]">
          <SidebarNav />
          <main className="flex-1 p-6 overflow-auto">
            <Home />
          </main>
          <RightSidebar />
        </div>
    </div>
  )
}

export default Page
