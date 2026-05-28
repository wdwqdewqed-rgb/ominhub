export function setupQualitySelector(hls) {

  if (!hls) return;

  const qualitySelect =
    document.getElementById("quality");

  if (!qualitySelect) return;

  qualitySelect.innerHTML = "";

  hls.on(Hls.Events.MANIFEST_LOADED, () => {

    const levels = hls.levels;

    levels.forEach((level, index) => {

      const option =
        document.createElement("option");

      option.value = index;

      option.textContent =
        `${level.height}p`;

      qualitySelect.appendChild(option);
    });
  });

  qualitySelect.addEventListener("change", () => {

    const level =
      parseInt(qualitySelect.value);

    hls.currentLevel = level;
  });
}