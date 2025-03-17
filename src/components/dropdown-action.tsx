import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from './ui/dropdown-menu';

type Props = {
    onDelete: () => void;
    onEdit: () => void;
};

const DropdownAction = ({
    onDelete,
    onEdit
}: Props) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className='cursor-pointer'>Action</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuItem  onClick={onDelete}>
                        Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onEdit}>
                        Edit
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DropdownAction;