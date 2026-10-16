import { gooeyToast } from 'goey-toast'

export function useToast() {
  return {
    toast: gooeyToast,
    success: (title: string, description?: string) =>
      gooeyToast.success(title, { description, duration: 4000 }),
    error: (title: string, description?: string) =>
      gooeyToast.error(title, { description, duration: 5000 }),
    info: (title: string, description?: string) =>
      gooeyToast.info(title, { description, duration: 4000 }),
    promise: <T>(
      promise: Promise<T>,
      messages: {
        loading: string
        success: string | ((data: T) => string)
        error: string | ((error: unknown) => string)
      },
    ) => gooeyToast.promise(promise, messages),
  }
}
