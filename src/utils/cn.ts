import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * tailwind-merge를 사용하여 클래스 이름을 병합하는 함수
 * @param inputs 클래스 이름 배열
 * @returns 병합된 클래스 이름
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
