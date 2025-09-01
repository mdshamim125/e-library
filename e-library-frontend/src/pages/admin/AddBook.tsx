/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useAddBookMutation } from "@/redux/features/book/book.api";
import { toast } from "sonner";

// 1️⃣ Zod schema
const createBookZodSchema = z.object({
  title: z
    .string({ message: "Title must be string" })
    .min(2, { message: "Title must be at least 2 characters long." })
    .max(200, { message: "Title cannot exceed 200 characters." }),
  author: z
    .string({ message: "Author must be string" })
    .min(2, { message: "Author name must be at least 2 characters long." })
    .max(100, { message: "Author name cannot exceed 100 characters." }),
  category: z
    .string({ message: "Category must be string" })
    .min(2, { message: "Category must be at least 2 characters long." })
    .max(50, { message: "Category cannot exceed 50 characters." }),
  publishedYear: z
    .number({ message: "Published year must be a number" })
    .int({ message: "Published year must be an integer" })
    .min(1500, { message: "Published year must be later than 1500" })
    .max(new Date().getFullYear(), {
      message: "Published year cannot be in the future",
    }),
  copiesAvailable: z
    .number({ message: "Copies available must be a number" })
    .int({ message: "Copies must be an integer" })
    .min(0, { message: "Copies cannot be negative" }),
  imageFile: z.instanceof(File, { message: "Invalid file" }).optional(),
  description: z
    .string({ message: "Description must be string" })
    .min(10, { message: "Description must be at least 10 characters long." })
    .max(1000, { message: "Description cannot exceed 1000 characters." })
    .optional(),
});

// 2️⃣ TypeScript type
type AddBookFormValues = z.infer<typeof createBookZodSchema>;

export function AddBook() {
  const [addBook] = useAddBookMutation();

  // 3️⃣ Initialize react-hook-form
  const form = useForm<AddBookFormValues>({
    resolver: zodResolver(createBookZodSchema),
    defaultValues: {
      title: "",
      author: "",
      category: "",
      publishedYear: undefined,
      copiesAvailable: undefined,
      imageFile: undefined,
      description: "",
    },
  });

  const onSubmit = async (values: AddBookFormValues) => {
    console.log(values.imageFile);
    try {
      let imageURL = "";

      if (values.imageFile) {
        // Upload the image
        imageURL = await imageUpload(values.imageFile);
      }

      // Create book data without the File object
      const { imageFile, ...rest } = values;
      const bookData = {
        ...rest,
        imageURL, // include hosted URL instead of file
      };

      const result = await addBook(bookData).unwrap();
      console.log(result);
      toast.success("Book Added Successfully");
      form.reset();

      console.log("Book Data to submit:", bookData);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image");
    }
  };

  return (
    <Card className="w-full mx-auto container">
      <CardHeader>
        <CardTitle>Add a New Book</CardTitle>
        <CardDescription>
          Fill in the details below to add a new book to the library
        </CardDescription>
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
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Book title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input placeholder="Author name(s)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Category + Published Year */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a category" />
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="publishedYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Published Year</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1999"
                        min={1500}
                        max={new Date().getFullYear()}
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

            {/* Copies Available + Image URL */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="copiesAvailable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Copies Available</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="8"
                        min={0}
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
                control={form.control}
                name="imageFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">Book Image</FormLabel>
                    <FormControl>
                      <InputFile
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.files && e.target.files.length > 0) {
                            const file = e.target.files[0];
                            // Optional: Convert file to URL for preview or store the file object
                            field.onChange(file); // update RHF value
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
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a short description..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Add Book
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
