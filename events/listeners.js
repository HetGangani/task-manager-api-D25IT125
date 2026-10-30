const taskEvents = require("./events");

let listenersRegistered = false;

function registerEventListeners() {
    if (listenersRegistered) {
        return;
    }
    listenersRegistered = true;

    // 1. Error Event Listener (Registered first to satisfy Node.js EventEmitter error contract)
    taskEvents.on("error", (error) => {
        const timestamp = new Date().toISOString();
        console.error(`\n[EVENT BUS: ERROR] [${timestamp}] Asynchronous processing error:`);
        console.error(`  - Message: ${error.message}`);
        if (error.stack) {
            console.error(`  - Stack: ${error.stack}`);
        }
    });

    // 2. task-created Event Listener
    taskEvents.on("task-created", (payload) => {
        try {
            const { task, user, apiResponseTimestamp } = payload;
            const receivedTimestamp = new Date().toISOString();

            const taskId = task?._id || task?.id;
            const taskTitle = task?.title || "Untitled Task";
            const actingUserId = user?.id || user?._id || "Unauthenticated";

            console.log(`\n[EVENT: task-created] [${receivedTimestamp}] Notification received:`);
            console.log(`  - Task ID: ${taskId}`);
            console.log(`  - Task Title: "${taskTitle}"`);
            console.log(`  - Authenticated Acting User ID: ${actingUserId}`);
            if (apiResponseTimestamp) {
                console.log(`  - API Response Timestamp: ${apiResponseTimestamp}`);
            }
            console.log(`  - Status: Asynchronous processing initiated (simulating 2-second notification delay)...`);

            // Artificial asynchronous delay of 2 seconds simulating notification dispatch
            setTimeout(() => {
                try {
                    // Check if simulated error was passed in payload for testing
                    if (payload.simulateError) {
                        throw new Error("Simulated asynchronous failure during task-created notification delivery");
                    }

                    const completedTimestamp = new Date().toISOString();
                    console.log(`\n[EVENT: task-created] [${completedTimestamp}] Notification processing completed:`);
                    console.log(`  - Task ID: ${taskId}`);
                    console.log(`  - Task Title: "${taskTitle}"`);
                    console.log(`  - Authenticated Acting User ID: ${actingUserId}`);
                    console.log(`  - Notification Status: Email/Webhook alert dispatched successfully (simulated)\n`);
                } catch (asyncErr) {
                    // Emit error safely without crashing the backend process
                    taskEvents.emit("error", asyncErr);
                }
            }, 2000);

        } catch (syncErr) {
            taskEvents.emit("error", syncErr);
        }
    });

    // 3. task-deleted Event Listener
    taskEvents.on("task-deleted", (payload) => {
        try {
            const { task, user, deletionTimestamp } = payload;
            const timestamp = new Date().toISOString();

            const taskId = task?._id || task?.id || payload.taskId;
            const taskTitle = task?.title || "Unknown Task";
            const actingUserId = user?.id || user?._id || "Unauthenticated";

            console.log(`\n[EVENT: task-deleted] [${timestamp}] Deletion notification processed:`);
            console.log(`  - Deleted Task ID: ${taskId}`);
            console.log(`  - Deleted Task Title: "${taskTitle}"`);
            console.log(`  - Authenticated Acting User ID: ${actingUserId}`);
            if (deletionTimestamp) {
                console.log(`  - Deletion API Timestamp: ${deletionTimestamp}`);
            }
            console.log(`  - Notification Status: Task removal recorded and subscriber notified\n`);
        } catch (err) {
            taskEvents.emit("error", err);
        }
    });

    console.log("[EVENT BUS] Event listeners registered: [error, task-created, task-deleted]");
}

module.exports = { registerEventListeners };

