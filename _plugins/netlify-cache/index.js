async function onPreBuild({ utils: { cache }, inputs }) {
  if (await cache.restore(inputs.paths)) {
    const files = await cache.list(inputs.paths);
    console.log(
      `Successfully restored: ${
        inputs.paths.join(", ")
      } ... ${files.length} files in total.`,
    );
  } else {
    console.log(
      `A cache of '${inputs.paths.join(", ")}' doesn't exist (yet).`,
    );
  }
}

async function onSuccess({ utils: { cache, status }, inputs }) {
  if (await cache.save(inputs.paths)) {
    const files = await cache.list(inputs.paths);
    console.log(
      `Successfully cached: ${
        inputs.paths.join(", ")
      } ... ${files.length} files in total.`,
    );

    // Show success & more detail in deploy summary
    status.show({
      title: `${files.length} files cached`,
      summary: "These will be restored on the next build! ⚡",
      text: `${inputs.paths.join(", ")}`,
    });
  } else {
    // This probably happened because the default `paths` is set, so provide instructions to fix
    console.log(
      `Attempted to cache: ${inputs.paths.join(", ")} ... but failed. :(`,
    );
    console.log(
      "Try setting the 'paths' input appropriately in your netlify.toml configuration.",
    );
  }
}

module.exports = { onPreBuild, onSuccess };
