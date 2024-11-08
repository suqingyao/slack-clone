import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Quill from 'quill';
import { toast } from 'sonner';

import { type EditorValue } from '@/components/editor';

import { useCreateMessage } from '@/features/messages/api/use-create-message';
import { useWorkspaceId } from '@/hooks/use-workspace-id';
import { useChannelId } from '@/hooks/use-channel-id';

const Editor = dynamic(() => import('@/components/editor'), { ssr: false });

interface ChatInputProps {
  placeholder: string;
}

export const ChatInput = ({ placeholder }: ChatInputProps) => {
  const [editorKey, setEditorKey] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const editorRef = useRef<Quill | null>(null);

  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();
  const { mutate: createMessage } = useCreateMessage();

  const handleSubmit = async ({ body, image }: EditorValue) => {
    try {
      setIsPending(true);
      await createMessage(
        {
          workspaceId,
          channelId,
          body,
        },
        {
          throwError: true,
        },
      );
      // rerender editor for clear editor content
      setEditorKey((prevKey) => prevKey + 1);
      // editorRef.current?.setContents([]);
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="px-5 w-full">
      <Editor
        key={editorKey}
        placeholder={placeholder}
        disabled={isPending}
        innerRef={editorRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
