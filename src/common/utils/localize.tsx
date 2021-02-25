import { useRouter } from "next/router";
import { Tlocale, Ttranslations } from "../types/localize";
import { en } from "../translations/english"
import { jp } from "../translations/japanese"
import { sin } from "../translations/sinhala"


export const selectedLocale = (): Ttranslations => {
  const router = useRouter();
  switch (router.locale) {
    case "en":
      return en;
    case "jp":
      return jp;
    case "sin":
      return sin;
    default:
      return en;
  }
};

export const toggleLanguage = (locale: Tlocale) => {
  const router = useRouter();
  switch (locale) {
    case "en":
      router.push("/", "/", { locale: "en" });
      break;
    case "sin":
      router.push("/", "/", { locale: "sin" });
      break;
    case "jp":
      router.push("/", "/", { locale: "jp" });
      break;
    default:
      break;
  }
};

export {en as english, jp as japanese, sin as sinhala}
