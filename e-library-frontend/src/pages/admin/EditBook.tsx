import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InputFile from "@/components/input-file";
import { imageUpload } from "@/utils/imageURLGenerator";
import {
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from "@/redux/features/book/book.api";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";

// ✅ Zod Schema (same as AddBook)
const createBookZodSchema = z.object({
  title: z.string().min(2).max(200),
  author: z.string().min(2).max(100),
  category: z.string().min(2).max(50),
  publishedYear: z.number().min(1500).max(new Date().getFullYear()),
  copiesAvailable: z.number().min(0),
  imageFile: z.instanceof(File).optional(),
  description: z.string().min(10).max(1000).optional(),
});

type EditBookFormValues = z.infer<typeof createBookZodSchema>;

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  //   console.log(id);

  const { data, isLoading } = useGetSingleBookQuery(id);
  const book = data?.data;
  //   console.log(book);
  const [updateBook] = useUpdateBookMutation();

  const form = useForm<EditBookFormValues>({
    resolver: zodResolver(createBookZodSchema),
    values: book
      ? {
          title: book.title,
          author: book.author,
          category: book.category,
          publishedYear: book.publishedYear,
          copiesAvailable: book.copiesAvailable,
          imageFile: undefined,
          description: book.description || "",
        }
      : undefined,
  });

  const onSubmit = async (values: EditBookFormValues) => {
    const toastId = toast.loading("Updating Book....");
    console.log(values);
    try {
      // Use existing image if no new file is uploaded
      let imageURL = book?.imageURL || "";

      if (values.imageFile) {
        imageURL = await imageUpload(values.imageFile);
      }

      // Prepare updatedData with fallback to existing book values
      const updatedData = {
        title: values.title ?? book?.title,
        author: values.author ?? book?.author,
        category: values.category ?? book?.category,
        publishedYear: values.publishedYear ?? book?.publishedYear,
        copiesAvailable: values.copiesAvailable ?? book?.copiesAvailable,
        description: values.description ?? book?.description,
        imageURL,
      };

      console.log(updatedData);

      // Wrap updatedData in bookData as expected by RTK Query
      await updateBook({ id: id!, bookData: updatedData }).unwrap();

      toast.success("Book updated successfully!", { id: toastId });
      navigate("/admin/all-books");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update book", { id: toastId });
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Card className="w-full mx-auto container">
      <CardHeader>
        <CardTitle>Edit Book</CardTitle>
        <CardDescription>Update the book details below</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Title + Author */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="author"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Category + Year */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="category"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      value={field.value || ""}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          <SelectItem value="DevOps">DevOps</SelectItem>
                          <SelectItem value="Software Engineering">
                            Software Engineering
                          </SelectItem>
                          <SelectItem value="Programming">
                            Programming
                          </SelectItem>
                          <SelectItem value="Computer Science">
                            Computer Science
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="publishedYear"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Published Year</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Copies + Image */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="copiesAvailable"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Copies Available</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="imageFile"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Book Image</FormLabel>
                    <FormControl>
                      <InputFile
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.files?.length) {
                            field.onChange(e.target.files[0]);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Update Book</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
