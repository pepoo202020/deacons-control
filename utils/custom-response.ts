import { ResponseIF } from "@/constants/types";

export const customResponse = ({
    success, title, message, data, error
} : ResponseIF) => {
    return {success, title, message, data, error}
}