/*

El módulo deberá sobrescribir un archivo en el directorio /proc con la siguiente información:

Carné
Nombre
Sistema operativo

Posterior a esto deberá listar todos los procesos, mostrando:

PID
Nombre
Estado

Debe imprimir el nombre del estudiante al cargar el módulo (insmod).

Debe imprimir el nombre del curso al momento de descargar el módulo (rmmod).

La información a mostrar debe ser obtenida por medio de los struct de datos del sistema operativo y no de la lectura de archivos o comandos de consola.

El contenido del archivo se debe actualizar al abrir el archivo (evento open).

El nombre del módulo será: cpu_<<carne>>


*/
#include <linux/module.h> 
#include <linux/kernel.h> 
#include <linux/init.h>
#include <linux/list.h>
#include <linux/types.h>
#include <linux/slab.h>
#include <linux/sched/task.h>
#include <linux/sched.h>
#include <linux/string.h>
#include <linux/fs.h>
#include <linux/seq_file.h>
#include <linux/proc_fs.h>
#include <asm/uaccess.h> 
#include <linux/hugetlb.h>
#include <linux/sched/signal.h>
#include <linux/sched.h>
 

#define FileProc "cpu_201404104_201403703"
#define Carnet "20104104_201403703"
#define Nombre "Andrea Vicente - Ruben Osorio"
#define Curso "Sistemas operativos 1"
#define SO "Ubuntu 18.04"

struct task_struct *task;
struct task_struct *task_child;
struct list_head *list;

static int proc_llenar_archivo(struct seq_file *m, void *v) {
        seq_printf(m, "UNIVERSIDAD DE SAN CARLOS DE GUATEMALA\n");
        seq_printf(m, "FACULTAD DE INGENIERIA\n");
        seq_printf(m, "ESCUELA DE CIENCIAS Y SISTEMAS\n");
        seq_printf(m, "SISTEMAS OPERATIVOS 1 SECCIÓN A\n");
        seq_printf(m, "ING. SERGIO ARNALDO MENDEZ AGUILAR\n");
        seq_printf(m, "AUX. BRYAN OTONIEL ORDOÑEZ MORALES\n");
        seq_printf(m, "Carnet: %s\n", Carnet);
        seq_printf(m, "Nombre: %s\n", Nombre);
        seq_printf(m, "Sistema operativo: %s\n", SO);

	for_each_process(task){
        seq_printf(m, "PID -> %d, Nombre -> %s, Estado -> %ld\n", task->pid, task->comm, task->state);
	list_for_each(list, &task->children){
		task_child = list_entry(list, struct task_struct, sibling);
	        seq_printf(m, "PID -> %d, Nombre -> %s, Estado -> %ld\n", task_child->pid, task_child->comm, task_child->state);
		}
	}
        return 0;
}

static int proc_al_abrir_archivo(struct inode *inode, struct  file *file) {
  return single_open(file, proc_llenar_archivo, NULL);
}

static struct proc_ops myops =
{
        .owner = THIS_MODULE,
        .open = proc_al_abrir_archivo,
        .read = seq_read,
        .llseek = seq_lseek,
        .release = single_release,
};



static int proc_memo_201404104_201403703_start(void){
        proc_create(FileProc,0,NULL,&myops);
        printk(KERN_INFO "Nombre: %s\n", Nombre);
        return 0;
}

static void proc_memo_201404104_201403703_end(void){
	remove_proc_entry(FileProc,NULL);
  	printk(KERN_INFO "Curso: %s\n", Curso);
}

module_init(proc_memo_201404104_201403703_start);
module_exit(proc_memo_201404104_201403703_end);
/*
 * Documentacion del modulo
 */
MODULE_LICENSE("GPL");
MODULE_AUTHOR(Nombre);
MODULE_DESCRIPTION("Modulo para mostrar info del estudiante y listar todos los procesos");
