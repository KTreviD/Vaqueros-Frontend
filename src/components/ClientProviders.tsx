"use client";

import React from "react";
import { Providers } from "@/providers";
import { Toaster } from "react-hot-toast";
import FakeBackendProvider from "./providers/FakeBackendProvider";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FakeBackendProvider>
      <Providers>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
          {children}
        </LocalizationProvider>

        <Toaster position="top-right" />
      </Providers>
    </FakeBackendProvider>
  );
}
