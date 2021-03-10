obj-m := cpu_201404104_201403703.o

KERNELDIR ?= /lib/modules/$(shell uname -r)/build

all default: modules
install: modules_install

modules modules_install help clean:
	$(MAKE) -C $(KERNELDIR) M=$(shell pwd) $@
insert:
	sudo insmod cpu_201404104_201403703.ko
	sudo dmesg

desinsert:
	sudo rmmod cpu_201404104_201403703.ko
	sudo dmesg	

