export const speechAvailable = !!window.speechSynthesis;

export const speakText = (text: string, lang: string, onDone: () => void) => {
  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find((voice) => voice.lang === lang);

  const utter = new SpeechSynthesisUtterance(text);
  if (voice) {
    utter.voice = voice;
  }
  utter.rate = 0.8;
  utter.onend = onDone;

  window.speechSynthesis.speak(utter);
};

export const stopSpeaking = () => {
  window.speechSynthesis.cancel();
};
