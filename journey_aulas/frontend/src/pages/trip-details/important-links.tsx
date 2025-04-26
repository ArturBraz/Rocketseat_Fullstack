import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";

export function ImportantLinks() {
    return (
        <div className="w-80 space-y-6">
            <div className="space-y-6">
                <h2 className="font-semibold text-xl">Links importantes</h2>
                {/* list links */}
                <div className="space-y-5">
                    {/* Link container */}
                    <div className="flex items-center justify-between gap-4">
                        <div className="space-y-1.5">
                            <span className="block font-medium text-zinc-100">
                                Reserva do AirBnB
                            </span>
                            <a
                                href="#"
                                className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
                            >
                                https://www.airbnb.com.br/rooms/10470001566165165111
                            </a>
                        </div>
                        <Link2 className="text-zinc-400 size-5 shrink-0" />
                    </div>

                    {/* Link container */}
                    <div className="flex items-center justify-between gap-4">
                        <div className="space-y-1.5">
                            <span className="block font-medium text-zinc-100">
                                Reserva do AirBnB
                            </span>
                            <a
                                href="#"
                                className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
                            >
                                https://www.airbnb.com.br/rooms/10470001566165165111
                            </a>
                        </div>
                        <Link2 className="text-zinc-400 size-5 shrink-0" />
                    </div>
                </div>
               
                <Button variant="secondary" size="full">
                    <Plus className="size-5 text-zinc-400" />
                    Cadastrar novo link
                </Button>
            </div>
        </div>
    );
}
