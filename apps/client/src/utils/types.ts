export interface Book {
  _id: string,
  title: string;
  author: string;
  genre: string;
  description: string;
  image?: string;
}
export interface BookListProps{
  inFavorites?: boolean
}
export interface BookCardProps {
  book: Book,
  inFavorites?: boolean
}
export interface ErrorResponse {
 message: string
}
export interface UserLoginData {
  userId: string,
  email: string,
  name: string
}
export interface User {
  token: string,
  userId: string,
  email: string,
  name: string
}
export interface AuthContextType {
  authUser: User | undefined,
  isLoggedIn: boolean,
  authLoading: boolean,
  setAuthUser: (user: User | undefined) => void,
  setIsLoggedIn: (isLoggedIn : boolean) => void
}
