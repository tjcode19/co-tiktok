import { useState, useEffect } from "react";

export const useGetFollowing = () => {
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [followingData, setFollowingData] = useState<Flashcard | null>(null);
  const [forYouData, setForYouData] = useState<MCQCard | null>(null);

  const fetchFollowingData = async () => {
    try {
      const res = await fetch(
        `https://cross-platform.rp.devfactory.com/following`
      );

      const data: Flashcard = await res.json();
      setFollowingData(data);
    } catch (error) {
      setErrorMsg("Could not load data");
    } finally {
      setLoading(false);
    }
  };

  const fetchForYouData = async () => {
    try {
      const res = await fetch(
        `https://cross-platform.rp.devfactory.com/for_you`
      );

      const data: MCQCard = await res.json();
      setForYouData(data);
    } catch (error) {
      setErrorMsg("Could not load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowingData();
    fetchForYouData();
  }, []);

  return { data: loading, errorMsg, followingData, forYouData };
};
