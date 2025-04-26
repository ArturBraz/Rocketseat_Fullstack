import foodSvg from "../assets/food.svg";
import othersSvg from "../assets/others.svg";
import servicesSvg from "../assets/services.svg";
import transportSvg from "../assets/transport.svg";
import accommodationSvg from "../assets/accommodation.svg";

export const CATEGORIES = {
  Food: {
    name: "Alimentação",
    icon: foodSvg,
  },
  Others: {
    name: "Outros",
    icon: othersSvg,
  },
  Services: {
    name: "Serviços",
    icon: servicesSvg,
  },
  Transport: {
    name: "Transporte",
    icon: transportSvg,
  },
  Accommodation: {
    name: "Hospedagem",
    icon: accommodationSvg,
  },
};

export const CATEGORIES_KEYS = Object.keys(CATEGORIES) as Array<
  keyof typeof CATEGORIES
>;
