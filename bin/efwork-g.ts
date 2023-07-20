import { useGenretor } from "../src/hooks/use-genretor";
import { genratorMode } from "../src/typings/genrator";

export function genStart (option: genratorMode) {
  useGenretor(option)
}
