'use client'

import HomePage from "@/pages/home";
import React from "react";
import { RecoilRoot } from "recoil";

export default function Home() {
  return (
    <RecoilRoot>
      <HomePage/>
      </RecoilRoot>
    )
}
