import { HuddleClient, HuddleProvider } from '@huddle01/react';
import { Children } from 'react';
 
const huddleClient = new HuddleClient({
  projectId: "JzQgpFbJ_3rCLMW0vSkZzgj8Als8s_y8",
  options: {
    activeSpeakers: {
      size: 2,
    },
  },
});
 
export function HuddleProv ({
  children,
}: {
  children: React.ReactNode;
})  {
  return (
    <HuddleProvider key="huddle01-provider" client={huddleClient}>
      {children}
    </HuddleProvider>
  );
};