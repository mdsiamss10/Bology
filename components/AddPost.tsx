"use client";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";

function AddPost() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [textLength, setTextLength] = useState(0);
  const maxTitleLength = 280;
  const [title, setTitle] = useState<string>("");
  const queryClient = useQueryClient();
  const editorRef = useRef<any>(null);

  const handleChange = (event: any, editor: any) => {
    const data = editor.getData();
    const strippedText = stripHtmlTags(data);
    const strippedTextLength = strippedText.replace(
      /<\/?[^>]+(>|$)/g,
      ""
    ).length;

    if (strippedTextLength <= maxTitleLength) {
      setTextLength(strippedTextLength);
      setTitle(data);
    } else {
      setTextLength(maxTitleLength);
      const truncatedText = strippedText.substring(0, maxTitleLength);
      setTitle(truncatedText);
    }
  };

  const stripHtmlTags = (html: string) => {
    const temporalDivElement = document.createElement("div");
    temporalDivElement.innerHTML = html;
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
  };

  const { mutate } = useMutation(
    async (title: string) => {
      await axios.post("/api/posts/addPost", { title });
    },
    {
      onError: (err: any) => {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message);
          setIsDisabled(false);
        }
      },
      onSuccess: () => {
        toast.dismiss("creating");
        queryClient.invalidateQueries(["getPosts"]);
        toast.success("Your thought just got its life.😀");
        setTitle("");
        setIsDisabled(false);
      },
    }
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (title.trim().length !== 0) {
      toast.loading("Giving your thoughts a new life.🛠️", {
        toastId: "creating",
      });
      setIsDisabled(true);
      mutate(title);
    } else {
      toast.info("Please enter a title.");
    }
  };

  return (
    <div className="flex flex-col bg-white p-4 mb-4 rounded-md shadow-2xl shadow-stone-200/90">
      <form onSubmit={handleSubmit}>
        <div className="w-full mb-1">
          <CKEditor
            editor={ClassicEditor}
            data={title}
            config={{ placeholder: "What's on your mind?" }}
            onChange={handleChange}
            ref={editorRef}
          />
        </div>
        <div className="w-full flex flex-col justify-between items-center sm:flex-row">
          <span
            className={`text-sm font-medium my-2 sm:mb-0 ${
              textLength === maxTitleLength ? "text-red-500" : "text-green-500"
            }`}
          >
            {textLength}/{maxTitleLength}
          </span>
          <button
            type="submit"
            disabled={isDisabled}
            className="btn btn-primary rounded-md float-right w-full text-white sm:w-auto"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
