import { useGenretor } from "@/hooks/use-genretor";
import { genratorMode } from "@/typings/genrator";

export function genStart (option: genratorMode) {
  useGenretor(option)
}
