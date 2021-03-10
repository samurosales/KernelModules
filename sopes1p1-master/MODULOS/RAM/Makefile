obj-m += meme.o

all:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) modules

clean:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) clean

insert:
	sudo insmod meme.ko
	sudo dmesg

desinsert:
	sudo rmmod meme.ko
	sudo dmesg

