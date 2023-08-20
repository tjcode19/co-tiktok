import { useState } from "react";

export const useRevealAnswer = (id: number) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [answerData, setAnswerData] = useState<Option | null>(null);

  const revealAnswer = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://cross-platform.rp.devfactory.com/reveal?id=${id}`
      );

      const dataG = await res.json();
      const data: Option = await dataG['correct_options'][0];

      setAnswerData(data);
    } catch (error) {
      setErrorMsg("Could not load data");
    } finally {
      setLoading(false);
    }
  };

  return { revealAnswer, loading, errorMsg, answerData };
};
