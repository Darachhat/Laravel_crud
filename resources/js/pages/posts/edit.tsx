import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import InputError from '@/components/input-error';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Post',
        href: '/posts',
    },
];

interface PostDataType {
    id: number;
    title: string;
    content: string;
    category: string;
    status: string;
    image: string;
}

export default function Dashboard({ postData}: { postData: PostDataType}) {

    const {data, setData, processing} = useForm<{
        title: string;
        category: string;
        status: string;
        contents: string;
        image: File | null;
    }>({
        title: postData.title,
        category: postData.category,
        status: postData.status,
        contents: postData.content,
        image: null,
    });

    const {errors} = usePage().props;

    function handlerFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        router.post(`/posts/${postData.id}`, {
            _method: 'put',
            ...data,
        });
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Post" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="rounded border p-6 shadow-xl">
                    <div className={"flex items-center justify-between mb-5"}>
                        <div className="text-xxl text-slate-600">
                            Edit Post
                        </div>


                        <Button>
                            <Link href="/posts" prefetch >Go Back</Link>
                        </Button>
                    </div>

                    <Card>
                        <CardContent>
                            <form onSubmit={handlerFormSubmit}>
                                <div className={'grid grid-cols-2 gap-4'}>
                                    <div className={'col-span-2 '}>
                                        <label htmlFor={'title'}>Title</label>
                                        <Input
                                            type="text"
                                            placeholder={'Title'}
                                            id={'title'}
                                            aria-invalid={errors.title !== undefined}
                                            value={data.title} onChange={e => setData('title', e.target.value)}/>
                                        <InputError message={errors.title} />
                                    </div>
                                    <div className={'col-span-2 md:col-span-1'}>
                                        <label htmlFor={'category'}>Category</label>
                                        <Select value={data.category} onValueChange={e => setData('category', e)}>
                                            <SelectTrigger id={'category'} aria-invalid={errors.category !== undefined}>
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Fiction">Fiction</SelectItem>
                                                <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.category} />
                                    </div>
                                    <div className={'col-span-2 md:col-span-1'}>
                                        <label htmlFor={'status'}>Status</label>
                                        <Select value={data.status == '1' ? '1' : '0'} onValueChange={e => setData('status', e)}>
                                            <SelectTrigger id={'status'} aria-invalid={errors.status !== undefined}>
                                                <SelectValue >{data.status == '1' ? 'Active' : 'Inactive'}</SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">Active</SelectItem>
                                                <SelectItem value="2">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.status} />
                                    </div>
                                </div>

                                <div className={'mt-4'}>
                                    <Label htmlFor={'contents'}>Content</Label>
                                    <Textarea
                                        rows={6}
                                        id='contents'
                                        placeholder={"Type Content here..."}
                                        value={data.contents}
                                        onChange={e => setData('contents', e.target.value)}
                                        aria-invalid={errors.contents !== undefined} />
                                    <InputError message={errors.contents} />
                                </div>
                                <div className={'mt-4'}>
                                    <Label htmlFor={"image"}>Image</Label>
                                    <Input type="file" id="image" onChange={e => {
                                        const file = e.target.files?.[0];
                                        if(file){
                                            setData('image', file);
                                    }
                                    }}
                                           aria-invalid={!!errors.image}
                                    />
                                    <InputError message={errors.image} />
                                    {/*{data.image && (<img src={URL.createObjectURL(data.image)} alt="image" className={'w-32 object-cover mt-2 rounded-lg'}/>)}*/}
                                    {postData.image && <img src={`/storage/${postData.image}`} alt="Preview" className={'w-32 object-cover mt-2 rounded-lg'}/>}
                                </div>

                                <div className={'mt-4 text-end'}>
                                    <Button size={'lg'}  type={'submit'} disabled={processing} >
                                        {processing && <Loader2 className={'animate-spin'} />}
                                        <span>Update Post</span>
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
