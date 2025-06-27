import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface LinksType {
    url: string;
    label: string;
    active: boolean;
}
interface PostTypes {
    links: LinksType[];
    to: number;
    from: number;
    total: number;
}

export default function InertiaPagination({ posts }: { posts: PostTypes}) {
    return (
        <div className={'mt-4 flex flex-wrap items-center justify-center gap-2 px-10 sm:justify-between'}>
            <div>
                {posts.from} - {posts.to} of {posts.total}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
                {posts.links.map((link, index) => {
                    const isDisabled = !link.url;

                    if (isDisabled) {
                        return (
                            <Button key={index} variant="outline" disabled
                            className={"pointer-events-none opacity-50"}
                            dangerouslySetInnerHTML={{ __html: link.label }}/>
                        );
                    }
                    return (
                        <Button key={index} variant={link.active ? 'default' : 'outline'}>
                            <Link dangerouslySetInnerHTML={{ __html: link.label }} href={link?.url}/>
                        </Button>
                    )
                })}
            </div>
        </div>
    );
}
