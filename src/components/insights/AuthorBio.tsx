import { authorInfo } from "@/data/insights";

interface AuthorBioProps {
  author: 'david' | 'nick';
}

const AuthorBio = ({ author }: AuthorBioProps) => {
  const info = authorInfo[author];

  return (
    <div className="bg-muted rounded-xl p-6">
      <div className="flex items-start space-x-4">
        <img
          src={info.image}
          alt={info.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h4 className="font-hero font-semibold text-lg uppercase">{info.name}</h4>
          <p className="text-sm text-muted-foreground mb-2">{info.title}</p>
          <p className="text-sm">{info.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthorBio;
