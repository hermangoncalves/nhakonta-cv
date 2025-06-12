import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="p-4 py-8">
      <div className="container mx-auto">
        <div className="flex flex-col justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-xl font-bold">nhakonta</span>
          </div>
          <p className="text-muted-foreground">
            Feito com ❤️ por{" "}
            <Link
              to="https://github.com/hermangoncalves"
              target="_blank"
              className="underline"
            >
              Herman Gonçalves
            </Link>
          </p>
          <div className="flex flex-col mt-8">
            <Link to="#" className="underline text-muted-foreground">
              Termos e Serviços
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
