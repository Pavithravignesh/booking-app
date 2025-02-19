import React from "react";

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={`border rounded-lg shadow-md p-4 ${className}`}>{children}</div>
);

export const CardHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={`border-b p-3 font-bold ${className || ''}`}>{children}</div>
);

export const CardTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-lg font-semibold">{children}</h2>
);

export const CardContent = ({ children }: { children: React.ReactNode }) => (
    <div className="p-3">{children}</div>
);