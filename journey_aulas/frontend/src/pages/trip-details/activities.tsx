import { CircleCheck } from "lucide-react";

export function Activities() {
    return (
        <div className="space-y-8">
            {/* Day container */}
            <div className="space-y-2.5">
                <div className="flex gap-2 items-baseline">
                    <span className="text-xl text-zinc-300 font-semibold">
                        Dia 17
                    </span>
                    <span className="text-xs text-zinc-300">Sábado</span>
                </div>
                {/* Activity card */}
                <p className="text-zinc-50 text-sm">
                    Nenhuma atividade nessa data.
                </p>
            </div>

            {/* Day container */}
            <div className="space-y-2.5">
                <div className="flex gap-2 items-baseline">
                    <span className="text-xl text-zinc-300 font-semibold">
                        Dia 18
                    </span>
                    <span className="text-xs text-zinc-300">Domingo</span>
                </div>
                {/* Activity card */}
                <div className="space-y-2.5">
                    <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                        <CircleCheck className="size-5 text-lime-300" />
                        <span className="text-zinc-100">Academia em grupo</span>
                        <span className="text-zinc-400 text-sm ml-auto">
                            08:00h
                        </span>
                    </div>
                </div>
                {/* Activity card */}
                <div className="space-y-2.5">
                    <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                        <CircleCheck className="size-5 text-lime-300" />
                        <span className="text-zinc-100">Almoço em família</span>
                        <span className="text-zinc-400 text-sm ml-auto">
                            12:00h
                        </span>
                    </div>
                </div>
            </div>

            {/* Day container */}
            <div className="space-y-2.5">
                <div className="flex gap-2 items-baseline">
                    <span className="text-xl text-zinc-300 font-semibold">
                        Dia 18
                    </span>
                    <span className="text-xs text-zinc-300">Domingo</span>
                </div>
                {/* Activity card */}
                <div className="space-y-2.5">
                    <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                        <CircleCheck className="size-5 text-lime-300" />
                        <span className="text-zinc-100">Academia em grupo</span>
                        <span className="text-zinc-400 text-sm ml-auto">
                            08:00h
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
