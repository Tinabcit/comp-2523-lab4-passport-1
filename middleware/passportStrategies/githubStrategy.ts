import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { database, User } from '../../models/userModel';


const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: "Ov23li609Ho0qziiDfdE",
        clientSecret: "cd7ee10ff6ae4cfd6ea529102b3533e465ca55f6",
        callbackURL: "http://localhost:8000/auth/github/callback",
        passReqToCallback: true,
    },
    
    /* FIX ME 😭 */
    async (req: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
        try {
            const githubId = profile.id;
            let user = database.find((user) => user.id === githubId);
            if (!user) {
                user = {
                    id: database.length + 1,
                    name: profile.displayName,
                    email: profile.emails?.[0]?.value ?? "",
                    role: "user",
                    githubId,
                    role: "user",
                } as User;
                database.push(user);
            }
            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    },
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
