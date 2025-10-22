import React, { useState } from "react";

type NotificationPrefs = {
    email: boolean;
    message: boolean;
    dailySummary: boolean;
    newReferrals: boolean;
    all: boolean;
};

const initialNotifications: NotificationPrefs = {
    email: false,
    message: false,
    dailySummary: false,
    newReferrals: false,
    all: false,
};

const reminderOptions = [
    "Every 15 minutes",
    "Every 30 minutes",
    "Hourly",
    "Daily",
    "Weekly",
];

const connectedTools = [
    "None",
    "Google Calendar",
    "Microsoft Teams",
    "HubSpot",
];

const loginHistoryMock = [
    { date: "July, 10 (10:03 AM)", device: "Chrome", location: "Location" },
    { date: "June, 25 (11:00 PM)", device: "Safari", location: "Location" },
];

const Settings: React.FC = () => {
    // Login & Security
    const [username, setUsername] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [twoFA, setTwoFA] = useState<"enable" | "disable" | "none">("none");

    // Notifications & Reminders
    const [notifications, setNotifications] =
        useState<NotificationPrefs>(initialNotifications);

    const [meetingReminders, setMeetingReminders] = useState(false);
    const [reminderFrequency, setReminderFrequency] = useState(
        reminderOptions[2]
    );

    // Integration
    const [connectedTool, setConnectedTool] = useState(connectedTools[0]);

    // Toast
    const [showToast, setShowToast] = useState(false);

    // Save handler
    const handleSave = (e?: React.FormEvent) => {
        e?.preventDefault?.();
        // Build payload (would be sent to API in a real app)
        const payload = {
            username,
            passwordChange:
                oldPassword || newPassword || confirmPassword
                    ? { oldPassword, newPassword, confirmPassword }
                    : null,
            twoFA: twoFA === "none" ? null : twoFA,
            notifications,
            meetingReminders,
            reminderFrequency,
            connectedTool,
        };

        console.log("Settings saved:", payload);

        // Show a simple success toast
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
    };

    // Notification toggle helper
    const toggleNotification = (key: keyof NotificationPrefs) => {
        if (key === "all") {
            const val = !notifications.all;
            setNotifications({
                email: val,
                message: val,
                dailySummary: val,
                newReferrals: val,
                all: val,
            });
            return;
        }
        setNotifications((prev) => {
            const next = { ...prev, [key]: !prev[key] };
            // If all non-'all' are true, set all true; otherwise false
            const othersAll =
                next.email &&
                next.message &&
                next.dailySummary &&
                next.newReferrals;
            return { ...next, all: othersAll };
        });
    };

    // Simple "Disconnect" action for connected tools
    const handleDisconnectTool = () => {
        setConnectedTool(connectedTools[0]);
    };

    return (
        <div className="p-6">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
            >
                {/* Header - Save button aligned right */}
                <div className="flex items-start justify-between mb-6">
                    <h1 className="text-2xl font-bold">Login & Security</h1>
                </div>

                {/* Username */}
                <div className="flex flex-col md:flex-row md:items-center mb-6 md:gap-10">
                    <label className="font-medium mb-2">Username</label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full md:w-[30%] rounded-xl border border-gray-200 p-3 text-sm placeholder-gray-300 focus:outline-none"
                        placeholder=""
                    />
                </div>

                {/* Change Password */}
                <div className="mb-6">
                    <p className="font-medium mb-3">Change Password</p>
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10 md:items-end">
                        <input
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="Old Password"
                            type="password"
                            className="flex-1 rounded-xl border border-gray-200 p-3 text-sm placeholder-gray-300 focus:outline-none"
                        />
                        <input
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New password"
                            type="password"
                            className="flex-1 rounded-xl border border-gray-200 p-3 text-sm placeholder-gray-300 focus:outline-none"
                        />
                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm"
                            type="password"
                            className="flex-1 rounded-xl border border-gray-200 p-3 text-sm placeholder-gray-300 focus:outline-none"
                        />
                    </div>
                </div>

                {/* 2 Factor Authentication */}
                <div className="mb-8">
                    <div className="flex items-center gap-18 md:gap-32">
                        <p className="font-medium">2 Factor Authentication</p>
                        <div className="flex gap-18">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="twofa"
                                    checked={twoFA === "enable"}
                                    onChange={() => setTwoFA("enable")}
                                    className="w-4 h-4 cursor-pointer"
                                />
                                <span className="text-sm">Enable</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="twofa"
                                    checked={twoFA === "disable"}
                                    onChange={() => setTwoFA("disable")}
                                    className="w-4 h-4 cursor-pointer"
                                />
                                <span className="text-sm">Disable</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="w-full flex justify-end">
                    <button
                        onClick={() => handleSave()}
                        type="button"
                        className="bg-black text-white px-10 py-2 rounded-md shadow-sm text-sm cursor-pointer"
                    >
                        Save
                    </button>
                </div>

                <hr className="border-gray-200 my-6" />

                {/* Notification Preferences */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Notification Preferences
                    </h2>

                    <div className="flex flex-wrap gap-y-6 gap-x-18 lg:gap-x-32 items-center mb-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={notifications.email}
                                onChange={() => toggleNotification("email")}
                                className="w-4 h-4 cursor-pointer"
                            />
                            <span className="text-sm font-semibold">Email</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={notifications.message}
                                onChange={() => toggleNotification("message")}
                                className="w-4 h-4 cursor-pointer"
                            />
                            <span className="text-sm font-semibold">
                                Message
                            </span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={notifications.dailySummary}
                                onChange={() =>
                                    toggleNotification("dailySummary")
                                }
                                className="w-4 h-4 cursor-pointer"
                            />
                            <span className="text-sm font-semibold">
                                Daily Summary
                            </span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={notifications.newReferrals}
                                onChange={() =>
                                    toggleNotification("newReferrals")
                                }
                                className="w-4 h-4 cursor-pointer"
                            />
                            <span className="text-sm font-semibold">
                                New Referrals
                            </span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={notifications.all}
                                onChange={() => toggleNotification("all")}
                                className="w-4 h-4 cursor-pointer"
                            />
                            <span className="text-sm font-semibold">All</span>
                        </label>
                    </div>

                    <hr className="border-gray-200 my-6" />

                    {/* Reminders */}
                    <div className="mb-4">
                        <p className="font-semibold mb-2">Reminders:</p>
                        <label className="flex items-center gap-2 mb-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={meetingReminders}
                                onChange={() => setMeetingReminders((s) => !s)}
                                className="w-4 h-4 cursor-pointer"
                            />
                            <span className="text-sm font-semibold">
                                Meeting Reminders
                            </span>
                        </label>

                        <div className="flex items-center gap-4">
                            <label className="text-sm font-semibold">
                                Reminder Frequency
                            </label>
                            <select
                                value={reminderFrequency}
                                onChange={(e) =>
                                    setReminderFrequency(e.target.value)
                                }
                                className="rounded-full border border-gray-200 px-4 py-2 text-sm focus:outline-none"
                            >
                                {reminderOptions.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <hr className="border-gray-200 my-6" />

                {/* Login History */}
                <div className="mb-6">
                    <p className="font-medium mb-3">Login History</p>
                    <ul className="list-none space-y-2 text-sm">
                        {loginHistoryMock.map((h, idx) => (
                            <li
                                key={idx}
                                className="flex items-center font-semibold gap-2"
                            >
                                <span>-</span>
                                <span>
                                    {h.date} - {h.device} ( {h.location} )
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <hr className="border-gray-200 my-6" />

                {/* Integration */}
                <div className="mb-6">
                    <p className="font-medium mb-3">Integration</p>

                    <div className="flex items-center gap-6">
                        <div>
                            <label className="text-sm block mb-2 font-semibold">
                                Connected Tools
                            </label>
                            <div className="flex items-center gap-4">
                                <select
                                    value={connectedTool}
                                    onChange={(e) =>
                                        setConnectedTool(e.target.value)
                                    }
                                    className="rounded-full border border-gray-200 px-4 py-2 text-sm focus:outline-none"
                                >
                                    {connectedTools.map((t) => (
                                        <option key={t} value={t}>
                                            {t}
                                        </option>
                                    ))}
                                </select>
                                {connectedTool !== "None" && (
                                    <button
                                        type="button"
                                        onClick={handleDisconnectTool}
                                        className="text-sm text-red-600 underline"
                                    >
                                        Disconnect
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/* Toast */}
            {showToast && (
                <div className="fixed right-6 bottom-6 bg-emerald-800 text-white px-4 py-2 rounded-md shadow">
                    Settings saved successfully
                </div>
            )}
        </div>
    );
};

export default Settings;
