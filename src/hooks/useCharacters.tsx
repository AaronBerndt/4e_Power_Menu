import { useQuery } from "react-query";
import axios from "axios";

export const FETCH_CHARACTER_KEY = "Fetch Character";

export function useCharacter(characterId: any) {
  return useQuery(
    [FETCH_CHARACTER_KEY, characterId],
    () =>
      axios.get(`https://4e-pwa.vercel.app/api/characters?_id=${characterId}`),
    {
      select: ({ data }) => data,
      refetchOnWindowFocus: false,
    }
  );
}
