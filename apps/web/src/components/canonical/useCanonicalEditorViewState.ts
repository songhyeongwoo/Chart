"use client";

import { useState } from "react";
import type { PaletteKey } from "./Charts";
import type { CanonicalColorMode } from "./editor-adapters";

export type CanonicalEditorViewSnapshot = {
  colorMode: CanonicalColorMode;
  palette: PaletteKey;
  singleColor: string;
  highlight: string;
  opacity: number;
  darkCanvas: boolean;
  showKPI: boolean;
  raceYear: number;
  racePlaying: boolean;
};

export function useCanonicalEditorViewState() {
  const [exportOpen, setExportOpen] = useState(false);
  const [recOpen, setRecOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [colorMode, setColorMode] = useState<CanonicalColorMode>("category");
  const [palette, setPalette] = useState<PaletteKey>("basicBlue");
  const [singleColor, setSingleColor] = useState("#1F3FFF");
  const [highlight, setHighlight] = useState("#FF6A3D");
  const [opacity, setOpacity] = useState(1);
  const [darkCanvas, setDarkCanvas] = useState(false);
  const [showKPI, setShowKPI] = useState(false);
  const [raceYear, setRaceYear] = useState(2024);
  const [racePlaying, setRacePlaying] = useState(true);
  const viewSnapshot: CanonicalEditorViewSnapshot = {
    colorMode,
    palette,
    singleColor,
    highlight,
    opacity,
    darkCanvas,
    showKPI,
    raceYear,
    racePlaying,
  };
  const applyViewSnapshot = (snapshot: CanonicalEditorViewSnapshot) => {
    setColorMode(snapshot.colorMode);
    setPalette(snapshot.palette);
    setSingleColor(snapshot.singleColor);
    setHighlight(snapshot.highlight);
    setOpacity(snapshot.opacity);
    setDarkCanvas(snapshot.darkCanvas);
    setShowKPI(snapshot.showKPI);
    setRaceYear(snapshot.raceYear);
    setRacePlaying(snapshot.racePlaying);
  };

  return {
    exportOpen,
    setExportOpen,
    recOpen,
    setRecOpen,
    uploadOpen,
    setUploadOpen,
    galleryOpen,
    setGalleryOpen,
    colorMode,
    setColorMode,
    palette,
    setPalette,
    singleColor,
    setSingleColor,
    highlight,
    setHighlight,
    opacity,
    setOpacity,
    darkCanvas,
    setDarkCanvas,
    showKPI,
    setShowKPI,
    raceYear,
    setRaceYear,
    racePlaying,
    setRacePlaying,
    viewSnapshot,
    applyViewSnapshot,
  };
}
