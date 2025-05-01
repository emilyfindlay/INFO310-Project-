/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/reactjs.jsx to edit this template
 */
import { useState }
from "react";

export default function DropdownMenu( { label, children }
) {
    const [isOpen, setIsOpen] = useState(false);
    return (
            <div className = "space-y-1">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full text-left font-semibold text-white p-2 rounded hover:bg-blue-700"
                    >
                    {label} {isOpen ? "▾" : "▸"}
                </button>
                {isOpen && (
                            <div className = "ml-4 space-y-1">
                                {children}
                            </div>
                            )}
            </div>
    );
}