import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from './ui/dropdown-menu';
import Link from 'next/link';

type Props = {
    onDelete: () => void;
    edit: string;
};

const DropdownAction = ({
    onDelete,
    edit
}: Props) => {
    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className='cursor-pointer'>Action</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={onDelete}>
                        Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={edit}>Edit</Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DropdownAction;