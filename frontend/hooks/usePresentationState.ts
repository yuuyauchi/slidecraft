// hooks/usePresentationState.ts
import { useState } from "react";

export function usePresentationState() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [view, setView] = useState<string>("input");
  const [topic, setTopic] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [audience, setAudience] = useState<string>("");
  const [generatedStructure, setGeneratedStructure] = useState<any>(null);
  const [editedSlides, setEditedSlides] = useState<any[]>([]);
  const [customFeedback, setCustomFeedback] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [template, setTemplate] = useState<string>("default");
  const [language, setLanguage] = useState<string>("ORIGINAL");
  const [fetchImages, setFetchImages] = useState<boolean>(true);
  const [downloadLink, setDownloadLink] = useState<string>("");
  const [selectedTemplateName, setSelectedTemplateName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return {
    username, setUsername,
    password, setPassword,
    isLoggedIn, setIsLoggedIn,
    isRegistering, setIsRegistering,
    view, setView,
    topic, setTopic,
    purpose, setPurpose,
    audience, setAudience,
    generatedStructure, setGeneratedStructure,
    editedSlides, setEditedSlides,
    customFeedback, setCustomFeedback,
    loading, setLoading,
    template, setTemplate,
    language, setLanguage,
    fetchImages, setFetchImages,
    downloadLink, setDownloadLink,
    selectedTemplateName, setSelectedTemplateName,
  };
}
