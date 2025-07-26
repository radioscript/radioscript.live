'use client';
import { useAuthStore } from '@/store';
import { Avatar, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react';
import { Camera } from 'iconsax-react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Cropper, CropperRef } from 'react-mobile-cropper';
import 'react-mobile-cropper/dist/style.css';

interface Image {
  type?: string;
  src: string;
}
export function UserAvatar() {
  const { updateAvatar, user, isLoading } = useAuthStore();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [image, setImage] = useState<Image | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<CropperRef>(null);

  const handleChooseAvatarClick = () => {
    fileInput.current?.click();
  };

  const onLoadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files[0]) {
      const blob = URL.createObjectURL(files[0]);
      setImage({
        src: blob,
        type: files[0].type,
      });
    }
    event.target.value = '';
    onOpen();
  };

  const handleUploadAvatar = async () => {
    const canvas = cropperRef.current?.getCanvas();
    if (!canvas) {
      console.error('No canvas available');
      return;
    }

    // Create a new canvas with fixed 256x256 dimensions
    const resizedCanvas = document.createElement('canvas');
    resizedCanvas.width = 256;
    resizedCanvas.height = 256;
    const ctx = resizedCanvas.getContext('2d');

    if (!ctx) {
      console.error('Could not create canvas context');
      return;
    }

    // Draw the cropped image onto the new canvas with the desired dimensions
    ctx.drawImage(canvas, 0, 0, 256, 256);

    // Convert to Blob
    resizedCanvas.toBlob(
      async (blob) => {
        if (!blob) return;

        try {
          const formData = new FormData();
          const filename = `avatar-${Date.now()}.jpg`;
          formData.append('avatar', blob, filename);

          await updateAvatar(formData);
          onClose();
          setImage(null);
        } catch (error) {
          console.error('Upload failed:', error);
        }
      },
      'image/jpeg',
      0.85 // Quality setting
    );
  };

  useEffect(() => {
    return () => {
      if (image && image.src) {
        URL.revokeObjectURL(image.src);
      }
    };
  }, [image]);

  return (
    <>
      <Avatar
        onClick={handleChooseAvatarClick}
        className="size-20 cursor-pointer"
        color="secondary"
        src={user.avatar_url}
        fallback={<Camera className="w-8 h-8 fill-secondary-foreground" variant="Bold" />}
      />
      <input ref={fileInput} type="file" className="absolute w-0 h-0 opacity-0" accept="image/*" onChange={onLoadImage} />
      <Modal size="lg" isKeyboardDismissDisabled={true} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">تصویر پروفایل</ModalHeader>
              <ModalBody>
                <div className="relative w-full h-96">
                  <Cropper
                    className="w-full h-full"
                    ref={cropperRef}
                    src={image?.src}
                    stencilProps={{
                      aspectRatio: 1,
                      grid: true,
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="light" onPress={onClose}>
                  بستن
                </Button>
                <Button color="primary" onPress={handleUploadAvatar} isLoading={isLoading}>
                  ذخیره تصویر
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
