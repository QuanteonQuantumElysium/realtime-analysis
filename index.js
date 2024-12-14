const { collectorEmitter, collector } = require("./collector");

collectorEmitter.on("step", (data) => {
  if (data.type === "info") console.log(`${data.timestamp} - ${data.step} - ${data.message}`);
  if (data.type === "error") console.error(`${data.timestamp} - ${data.step} - ${data.message}`);
});

const runCollector = async () => {
  const result = await collector();

  if (result.success) {
    console.log("Collector finished successfully");
  } else {
    console.error("Collector failed:", result.message);
  }
};

runCollector();