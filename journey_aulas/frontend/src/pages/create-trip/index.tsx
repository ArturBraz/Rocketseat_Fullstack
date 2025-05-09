import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import InvitesGuestStep from "./steps/invites-guest-step";

export function CreateTripPage() {
    const navigate = useNavigate();

    const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
    const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
    const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

    const [emailsToInvite, setEmailsToInvite] = useState(["hess.48@yahoo.com"]);

    //input
    function openGuestsInput() {
        setIsGuestsInputOpen(true);
    }
    function closeGuestsInput() {
        setIsGuestsInputOpen(false);
    }

    //modal guest
    function openGuestsModal() {
        setIsGuestsModalOpen(true);
    }
    function closeGuestsModal() {
        setIsGuestsModalOpen(false);
    }

    //modal confirm trip
    function openConfirmTripModal() {
        setIsConfirmTripModalOpen(true);
    }
    function closeConfirmTripModal() {
        setIsConfirmTripModalOpen(false);
    }

    //invites
    function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const email = data.get("email")?.toString();

        if (!email) {
            return;
        }

        if (emailsToInvite.includes(email)) {
            return;
        }

        setEmailsToInvite([...emailsToInvite, email]);

        event.currentTarget.reset();
    }
    function removeEmailFromInvites(emailToRemove: string) {
        const newEmailList = emailsToInvite.filter(
            (email) => email !== emailToRemove
        );

        setEmailsToInvite(newEmailList);
    }

    //
    function createTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        navigate("/trips/123");
    }

    return (
        <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
            <div className="max-w-3xl w-full px-6 text-center space-y-10">
                <div className="flex flex-col items-center gap-3">
                    <img src="/Logo.svg" alt="" />
                    <p className="text-zinc-300 text-lg">
                        Convide seus amigos e planeje sua próxima viagem!
                    </p>
                </div>

                <div className="space-y-4">
                    <DestinationAndDateStep
                        closeGuestsInput={closeGuestsInput}
                        openGuestsInput={openGuestsInput}
                        isGuestsInputOpen={isGuestsInputOpen}
                    />

                    {isGuestsInputOpen && (
                        <InvitesGuestStep
                            emailsToInvite={emailsToInvite}
                            openConfirmTripModal={openConfirmTripModal}
                            openGuestsModal={openGuestsModal}
                        />
                    )}
                </div>

                <p className="text-sm text-zinc-500">
                    Ao planejar sua viagem pela plann.er você automaticamente
                    concorda
                    <br />
                    com nossos{" "}
                    <a className="text-zinc-300 underline" href="#">
                        termos de uso
                    </a>{" "}
                    e{" "}
                    <a className="text-zinc-300 underline" href="#">
                        políticas de privacidade
                    </a>
                    .
                </p>

                {isGuestsModalOpen && (
                    <InviteGuestsModal
                        emailsToInvite={emailsToInvite}
                        addNewEmailToInvite={addNewEmailToInvite}
                        closeGuestsModal={closeGuestsModal}
                        removeEmailFromInvites={removeEmailFromInvites}
                    />
                )}

                {isConfirmTripModalOpen && (
                    <ConfirmTripModal
                        closeConfirmTripModal={closeConfirmTripModal}
                        createTrip={createTrip}
                    />
                )}
            </div>
        </div>
    );
}
